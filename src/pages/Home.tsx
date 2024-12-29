import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "~/components/solidui/button";
import { TextField, TextFieldInput } from "~/components/solidui/text-field";

function Home() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <>
      <h1>Welcome to Tauri + Solid</h1>
      <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <TextField>
          <TextFieldInput
            type="text"
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
        </TextField>
        <Button type="submit">Greet</Button>
      </form>
      <p>{greetMsg()}</p>
    </>
  );
}

export default Home;
