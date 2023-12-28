import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { Database } from '../../../../lib/database.types';
import { NextResponse } from 'next/server';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      // runs on our server
      const res = NextResponse.next();
      const supabase = createMiddlewareClient<Database>({ req, res });
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // throw so user cannot upload
      if (!session) throw new Error('Unauthorized');

      return { supabase_id: session.user.id }; // attach metadata to UploadThing file
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // runs on our server
      console.log('Upload complete for supabase_id:', metadata.supabase_id);
      console.log('file url', file.url);

      return { uploadedBy: metadata.supabase_id }; // sent to onClientUploadComplete in client
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
