import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// CREATE
export async function createCabin(newCabin) {
  const file = newCabin.image;

  let imagePath = newCabin.image;

  const isImageUrl =""
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  // upload
  if (file instanceof File && !isImageUrl) {
    const imageName = `${Date.now()}-${file.name}`.replaceAll("/", "");

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, file, {
        contentType: file.type,
      });

    if (storageError) {
      throw new Error("Cabin image could not be uploaded");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) throw new Error("Cabin could not be created");

  return data;
}
// UPDATE
export async function updateCabin(newCabin, id) {
  if (!id) throw new Error("Invalid ID");

  const file = newCabin.image;

  let imagePath = newCabin.image;

  // لو مفيش صورة جديدة خالص → سيب القديمة زي ما هي
  if (!imagePath) {
  delete newCabin.image;
}

  const isImageUrl =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  // upload لو فيه صورة جديدة
  if (file instanceof File && !isImageUrl) {
    const imageName = `${Date.now()}-${file.name}`.replaceAll("/", "");

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, file, {
        contentType: file.type,
      });

    if (storageError) {
      throw new Error("Cabin image could not be uploaded");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", Number(id))
    .select()
    .single();

  if (error) throw new Error("Cabin could not be updated");

  return data;
}


// DELETE
export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}