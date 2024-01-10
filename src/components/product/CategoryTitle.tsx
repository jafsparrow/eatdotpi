import { component$ } from "@builder.io/qwik";

export default component$<{ title: string }>(({ title }) => {
  return (
    <div>
      <h2 class=" mb-2 px-2 text-xl font-bold">{title}</h2>
    </div>
  );
});
