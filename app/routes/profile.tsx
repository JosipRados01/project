import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";


export async function loader({ request }: LoaderFunctionArgs) {

    // get the user data or redirect to /login if it failed
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
      });
    
      // return the user data
      return user;
  };

// Define the user type
export type User = {
    id: number;
    email: string;
    name: string;
    role: string;
};

export default function Profile() {
    let user = useLoaderData() as User;
    console.log(user);

  return (
    <div>
      <h1>Hi {user.name}</h1>
    </div>
  );
}