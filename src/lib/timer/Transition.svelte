<script>
import { onMount } from "svelte";
import { cn } from "$lib/utils";
let {
  isRunning = $bindable(true),
  children,
  class: className,
} = $props();

const colors = [
  'oklch(0 0 0)',  // invisible
  'oklch(0.36 0.14 301.44)', // Royal purple
  'oklch(0.36 0.07 238.29)', // Sky blue
];

let interval = null;

let currentColorIndex = $state(0);
function flickColor() {
  let nextIndex;
  // Ensure we don't pick the same color twice in a row
  do {
    nextIndex = Math.floor(Math.random() * colors.length);
  } while (nextIndex === currentColorIndex);
  currentColorIndex = nextIndex;
}
function handleStop() {
  if (interval) clearInterval(interval)
}
function handleStart() {
  if (interval) return;
	interval = setInterval(() => {		
		flickColor();
	}, 2000);
}
$effect(() => {
  if (isRunning) { handleStart(); }
  else { handleStop(); }
	return () => { 
		if (interval) clearInterval(interval) ;
	}
});
onMount(() => {
})
</script>

<div id="container" 
  class={cn("flex", className)} 
  style="background-color: {colors[currentColorIndex]}">
  {@render children?.()}
</div>

<style>
#container {
  transition: background-color 2.0s 
  cubic-bezier(0.1, 0.2, 1, 2);
}
</style>