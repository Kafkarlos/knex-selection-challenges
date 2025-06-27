import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import sha256 from "crypto-js/sha256";
import type { User } from "../types/User";

type AuthContextType = {
  user: User | null;
  users: User[];
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  users: [],
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10&nat=br&format=json")
      .then((response) => {
        const data = response.data.results;

        const formattedUsers = data.map((item: any, index: number) => ({
          id: index + 1,
          name: `${item.name.first} ${item.name.last}`,
          email: item.email,
          phone: item.phone,
          age: item.dob.age,
          gender: item.gender,
          country: item.location.country,
          state: item.location.state,
          picture: item.picture.medium,
        }));

        const mainUser = formattedUsers[0];
        const token = sha256(mainUser.email).toString();
        Cookies.set("user_token", token, { expires: 7 });

        setUser(mainUser);
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, users, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
