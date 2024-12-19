import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function Submit() {
    const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
    try {
      const { data } = await axios.post(`${backendurl}/api/user/register`, {
        name: name,
        email: email,
        password: password,
        pic: img,
      });
      Cookies.set("authtoken", data.token, { expires: 7 });
      window.location.reload();
      toast.success("Successfully logged in");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data || "Something went wrong");
    }
  }
  const disabled =
    !name.length > 3 ||
    !username.length > 3 ||
    !email.match(emailRegex) ||
    !password.length > 8;

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="md:w-96 m-auto bg-transparent">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link to={"/"} className="underline">
              Login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="text-sm text-muted-foreground"></p>
              </div>
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Username must be more than 3 characters
                </p>
              </div>

              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="img">img url</Label>
                <Input
                  id="pic"
                  placeholder="Image url"
                  name="pic"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">this img url</p>
              </div>
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Email must be valid
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Password must be more than 8 characters
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/"}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={Submit} disabled={loading || disabled}>
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
