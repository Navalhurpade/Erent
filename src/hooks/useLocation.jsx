import { useEffect, useState } from "react";

export default function useLocation() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (err) => {
        console.log(err);
      },
      { timeout: 10000 }
    );
  }, []);

  return location;
}
