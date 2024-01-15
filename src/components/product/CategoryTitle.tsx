import { component$ } from "@builder.io/qwik";

export default component$<{ title: string }>(({ title }) => {
  return (
    <div class="flex gap-2">
      <h2 class="text-xl font-bold">{title}</h2>
    </div>
  );
});
