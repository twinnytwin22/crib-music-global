import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { cache } from "react";
import { v4 as uuid } from "uuid";

export const revalidate = 3600; // revalidate the data at most every hour

export const getSong = async (song) => {
  try {
    const songFile = await downloadFile({
      path: song?.music_file_url,
      bucket: "tracks",
    });
    return songFile;
  } catch (error) {
    throw error;
  }
};
export const getAllArtists = async () => {
  try {
    const res = await fetch(`/api/v1/getAllArtists/`, {
      next: { revalidate: 3600 },
      method: "GET",
      //cache: 'no-cache',
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
      },

      //  mode: 'no-cors',
    });

    if (res) {
      const artists = await res.json();

      //const data = songs.json()
      return artists;
    }
  } catch (error) {
    throw error;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await fetch(`/api/v1/getAllSongs/`, {
      method: "GET",
      next: { revalidate: 3600 },

      //cache: 'force-cache',
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
      },

      //  mode: 'no-cors',
    });

    if (res) {
      const songs = await res.json();

      //const data = songs.json()
      return songs;
    }
  } catch (error) {
    throw error;
  }
};

export const addMewArtist = async ({ updates }: any) => {
  try {
    const res = await fetch(`/api/v1/music/addNewArtist`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(updates).length.toString(),

        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ updates }),

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const artist = await res.json();

      //const data = songs.json()
      return artist;
    }
  } catch (error) {
    throw error;
  }
};

export const addNewSong = async ({ updates }: any) => {
  try {
    const res = await fetch(`/api/v1/music/addNewSong`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        //  "Content-Length": JSON.stringify(updates).length.toString(),

        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ updates }),

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const song = await res.json();

      //const data = songs.json()
      return { song, ok: true };
    }
  } catch (error) {
    throw error;
  }
};
export async function deleteFile({
  path,
  bucket,
}: {
  path: string;
  bucket: string;
}) {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path]);
    if (error) {
      throw error;
    }

    // const url = URL.createObjectURL(data)
    return data;
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}

export const downloadFile = cache(
  async ({ path, bucket }: { path: string; bucket: string }) => {
    try {
      const { data: url, error } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUrl(path, 3600);
      if (error) {
        throw error;
      }

      // const url = URL.createObjectURL(data)
      return url?.signedUrl;
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  },
);
export const uploadFile = async ({
  event,
  file,
  bucket,
}: {
  event?: any;
  file: any;
  bucket: string;
}) => {
  try {
    if (!file) {
      throw new Error("You must select a file to upload.");
    }
    const uid = uuid();
    const fileExt = file.name.split(".").pop();
    // Replace spaces in the file name with underscores
    const fileNameWithoutSpaces = file.name.replace(/ /g, "_");
    const fileNameWithoutExtension = fileNameWithoutSpaces.replace(
      /\.\w+$/,
      "",
    ); // Remove existing extension
    const filePath = `${uid}-${fileNameWithoutExtension}.${fileExt}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  } catch (error) {
    console.log(error);
    // You may want to re-throw the error to handle it at a higher level
    throw error;
  }
};
