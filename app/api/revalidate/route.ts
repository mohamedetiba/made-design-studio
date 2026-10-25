import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity webhook → instant updates after "Publish".
 * Sanity → API → Webhooks: URL https://<domain>/api/revalidate, POST,
 * projection {_type, "slug": slug.current}, secret = SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: string }>(req, process.env.SANITY_REVALIDATE_SECRET);
    if (!isValidSignature) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    if (!body?._type) return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    revalidateTag(body._type);
    if (body._type === 'project') revalidateTag('space');
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, type: body._type, slug: body.slug, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}
