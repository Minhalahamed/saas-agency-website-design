import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ 
        error: "Product slug is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    const product = await db.select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found' 
      }, { status: 404 });
    }

    return NextResponse.json(product[0]);

  } catch (error) {
    console.error('GET product by slug error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}