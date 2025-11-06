import { useEffect, useState } from "react";
import { UserData } from "@/types/userData";

export function useGetOtherUserData(userId: string | null) {
  const [otherUserData, setOtherUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/user/userData/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setOtherUserData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return { otherUserData, loading };
}
