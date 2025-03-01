import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@designers-kit/ui";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>About</h3>
      <Button variant={"default"}>Button</Button>
    </div>
  );
}
