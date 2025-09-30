import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, products } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

async function getCurrentUser(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return session?.user || null;
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED' 
      }, { status: 401 });
    }

    const requestBody = await request.json();
    const { product_id } = requestBody;

    // Validate required fields
    if (!product_id) {
      return NextResponse.json({ 
        error: "Product ID is required",
        code: "MISSING_PRODUCT_ID" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(product_id))) {
      return NextResponse.json({ 
        error: "Valid product ID is required",
        code: "INVALID_PRODUCT_ID" 
      }, { status: 400 });
    }

    // Look up product to get price
    const product = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(product_id)))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found',
        code: 'PRODUCT_NOT_FOUND' 
      }, { status: 404 });
    }

    // Create order with product price
    const newOrder = await db.insert(orders)
      .values({
        userId: user.id,
        productId: parseInt(product_id),
        amountCents: product[0].priceCents,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    // Return order with product details
    const orderWithProduct = {
      ...newOrder[0],
      product: {
        name: product[0].name,
        slug: product[0].slug
      }
    };

    return NextResponse.json(orderWithProduct, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED' 
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get orders for authenticated user with product details
    const userOrders = await db.select({
      id: orders.id,
      userId: orders.userId,
      productId: orders.productId,
      amountCents: orders.amountCents,
      status: orders.status,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,
      product: {
        name: products.name,
        slug: products.slug,
        priceCents: products.priceCents
      }
    })
    .from(orders)
    .innerJoin(products, eq(orders.productId, products.id))
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt))
    .limit(limit)
    .offset(offset);

    return NextResponse.json(userOrders);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}