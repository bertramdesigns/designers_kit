import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/file-utils')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/file-utils"!</div>
}
