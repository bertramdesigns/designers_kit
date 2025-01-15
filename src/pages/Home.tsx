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
    <div class="flex flex-col justify-between space-y-8">
      <div class="flex flex-col w-full space-y-1">
        <h2 class="text-2xl font-bold tracking-tight">Designer's Kit</h2>
        <p class="text-muted-foreground">
          A hodgepodge of components and utilities for my work.
        </p>
      </div>

      <form
        class=" flex flex-row"
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
    </div>
  );
}

export default Home;
