import { QRL, $, component$, useSignal, Slot } from "@builder.io/qwik";
import { LuXCircle } from "@qwikest/icons/lucide";

interface ModalProps {
  isOpen?: boolean;
  onClose: QRL<() => void>;
  onSubmit: QRL<() => void>;
  title?: string;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: QRL<() => void>;
  secondaryActionLabel?: string;
}
export default component$<ModalProps>(
  ({ isOpen, onClose, title, disabled }) => {
    const showModal = useSignal(isOpen);

    const handleOnClose = $(() => {
      console.log("hello working");
      if (disabled) {
        return;
      }

      showModal.value = false;
      setTimeout(() => {
        onClose();
      }, 300);
    });

    // const handleSubmit$ = $(() => {
    //   {
    //     if (disabled) {
    //       return;
    //     }

    //     onSubmit();
    //   }
    // });

    // const handleSecondaryAction$ = $(() => {
    //   {
    //     if (disabled || !secondaryAction) {
    //       return;
    //     }

    //     secondaryAction();
    //   }
    // });

    if (!isOpen) {
      return null;
    }

    return (
      <>
        <div
          class="
              fixed 
              inset-0 
              z-50 
              flex 
              items-center 
              justify-center 
              overflow-y-auto 
              overflow-x-hidden 
              bg-neutral-800/70 
              outline-none
              focus:outline-none
            "
        >
          <div
            class="
              relative 
              mx-auto
              my-6
              h-full
              w-full
              md:h-auto
              md:w-4/6 
              lg:h-auto 
              lg:w-3/6
              xl:w-2/5
              "
          >
            {/*content*/}
            <div
              class={`
                translate
                h-full
                duration-300
                ${showModal.value ? "translate-y-0" : "translate-y-full"}
                ${showModal.value ? "opacity-100" : "opacity-0"}
              `}
            >
              <div
                class="
                  translate
                  relative
                  flex
                  h-full
                  w-full 
                  flex-col 
                  rounded-lg 
                  border-0 
                  bg-white 
                  shadow-lg 
                  outline-none 
                  focus:outline-none 
                  md:h-auto 
                  lg:h-auto
                "
              >
                {/*header*/}
                <div
                  class="
                    relative 
                    flex 
                    items-center
                    justify-center
                    rounded-t
                    border-b-[1px]
                    p-6
                    "
                >
                  <button
                    class="
                        absolute
                        right-6
                        border-0
                        p-1
                        transition
                        hover:opacity-70
                      "
                    onClick$={handleOnClose}
                  >
                    <LuXCircle font-size={24} />
                  </button>
                  <div class="text-lg font-semibold">{title}</div>
                </div>
                {/*body*/}
                <div class="relative flex-auto p-6">
                  <Slot name="body" />
                </div>
                {/*footer*/}
                <div class="flex flex-col gap-2 p-6">
                  <div
                    class="
                        flex 
                        w-full 
                        flex-row 
                        items-center 
                        
                        gap-4
                      "
                  >
                    {/* {secondaryAction && secondaryActionLabel && (
                        <Button 
                          disabled={disabled} 
                          label={secondaryActionLabel} 
                          onClick={handleSecondaryAction}
                          outline
                        />  
                      )} */}

                    {/* <button disabled={disabled} onClick$={handleOnClose}>
                      Close
                    </button>
                    <button disabled={disabled} onClick$={handleOnClose}>
                      ADD
                    </button> */}
                  </div>
                  {/* {footer} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);
