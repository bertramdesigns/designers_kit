import { createSignal, Switch, Match } from "solid-js";
import { login, logout, register, getUser, authState } from "~/store/authStore";
import {
  TextField,
  TextFieldLabel,
  TextFieldInput,
} from "~/components/solidui/text-field";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "~/components/solidui/tabs";
import { Button } from "~/components/solidui/button";

const App = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [name, setName] = createSignal("");

  const handleLogout = () => {
    logout();
  };

  return (
    <Switch>
      <Match when={!authState.isAuthenticated}>
        <div>
          <p>Not logged in</p>
          <Tabs defaultValue="account" class="w-[400px]">
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <TextField class="space-y-1">
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput
                  value={email()}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </TextField>
              <TextField class="space-y-1">
                <TextFieldLabel>Password</TextFieldLabel>
                <TextFieldInput
                  type="password"
                  placeholder="Password"
                  value={password()}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </TextField>
              <Button onClick={() => login(email(), password())}>Login</Button>
            </TabsContent>
            <TabsContent value="signup">
              <TextField class="space-y-1">
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput
                  value={email()}
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </TextField>
              <TextField class="space-y-1">
                <TextFieldLabel>Password</TextFieldLabel>
                <TextFieldInput
                  type="password"
                  placeholder="Password"
                  value={password()}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </TextField>
              <TextField class="space-y-1">
                <TextFieldLabel>Name</TextFieldLabel>
                <TextFieldInput
                  type="text"
                  placeholder="Name"
                  value={name()}
                  onChange={(e) => setName(e.target.value)}
                />
              </TextField>
              <Button onClick={() => register(email(), password(), name())}>
                Register
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </Match>
      <Match when={authState.isAuthenticated}>
        <div>
          <p>Logged in as {getUser().name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </Match>
    </Switch>
  );
};

export default App;
