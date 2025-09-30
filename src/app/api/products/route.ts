import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let query = db.select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      priceCents: products.priceCents,
      image: products.image
    }).from(products);

    if (search) {
      query = query.where(
        or(
          like(products.name, `%${search}%`),
          like(products.description, `%${search}%`)
        )
      );
    }

    const results = await query.limit(limit).offset(offset);
    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        error: 'Authorization header with Bearer token required',
        code: 'MISSING_AUTHORIZATION' 
      }, { status: 401 });
    }

    const requestBody = await request.json();
    const { slug, name, description, price_cents, image, features } = requestBody;

    // Validate required fields
    if (!slug) {
      return NextResponse.json({ 
        error: "Slug is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ 
        error: "Name is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!description) {
      return NextResponse.json({ 
        error: "Description is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!price_cents) {
      return NextResponse.json({ 
        error: "Price cents is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Validate price_cents is a number
    if (isNaN(parseInt(price_cents))) {
      return NextResponse.json({ 
        error: "Price cents must be a valid number",
        code: "INVALID_PRICE" 
      }, { status: 400 });
    }

    // Check for duplicate slug
    const existingProduct = await db.select()
      .from(products)
      .where(eq(products.slug, slug.trim()))
      .limit(1);

    if (existingProduct.length > 0) {
      return NextResponse.json({ 
        error: "Product with this slug already exists",
        code: "DUPLICATE_SLUG" 
      }, { status: 409 });
    }

    // Prepare insert data
    const insertData = {
      slug: slug.trim(),
      name: name.trim(),
      description: description.trim(),
      priceCents: parseInt(price_cents),
      image: image || null,
      features: features || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newProduct = await db.insert(products)
      .values(insertData)
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}