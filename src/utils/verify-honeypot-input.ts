// Use HoneypotInput in your form before using this function
// const isBot = await verifyBotHoneypot(formData, 5000);

import { asyncDelay } from "./async-delay";

export async function verifyHoneypotInput(formData: FormData, delay = 3000) {
  await asyncDelay(delay);

  const niceInputValue = formData.get("teste");
  console.log(niceInputValue);

  const isBot =
    niceInputValue === null || // campo não enviado
    (typeof niceInputValue === "string" && niceInputValue.trim() !== "");

  return isBot;
}
