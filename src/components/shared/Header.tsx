import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const isOpen = useSignal(false);
  const menuItems = useSignal([
    { title: "Home", href: "/about" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/about" },
  ]);
  return (
    <nav class="mx-auto  border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8 w-8"
            alt="Flowbite Logo"
            height={6}
            width={22}
          />
          <span class="self-center whitespace-nowrap text-2xl font-thin dark:text-white">
            EatdotPi
          </span>
        </a>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
          onClick$={() => (isOpen.value = !isOpen.value)}
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            color={`${isOpen.value && "blue"}`}
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          class={` w-full md:block md:w-auto   ${
            isOpen.value ? "block" : "hidden"
          }`}
          id="navbar-solid-bg"
        >
          <ul class="mt-4 flex flex-col  rounded-lg bg-gray-50 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:dark:bg-transparent">
            {menuItems.value.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  class="block rounded px-3 py-2  dark:bg-blue-600 md:bg-transparent md:p-0 md:text-blue-700 md:dark:bg-transparent md:dark:text-blue-500"
                  aria-current="page"
                >
                  {item.title}
                </a>
              </li>
            ))}

            <li>
              <a
                href="#"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

{
  /* <img src="/rest_logo.jpg" width={60} height={60} /> */
}
