interface LikePhoto {
  photoId: number;
  userIdLiked: string;
}
export async function LikePhoto({ photoId, userIdLiked }: LikePhoto) {
  try {
    const response = await fetch(`/api/photos/${photoId.toString()}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIdLiked: userIdLiked }),
    });
    if (response.ok) {
      console.log("Photo liked", photoId);
    }
  } catch (err) {
    console.log(err);
  }
}
