<script>
import { onMount } from "svelte";
let {
  isRunning = $bindable(false),
  children,
} = $props();

const colors = [
  '#863335', // Coral red
  '#8a4446', // Coral red
  '#677d44', // Grass green
  '#1f4c69', // Sky blue
  '#6a4c93', // Royal purple
  '#cba336'  // Soft cream
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
	if (isRunning) return;
	// handleInit();
	isRunning = true;
	interval = setInterval(() => {		
		flickColor();
	}, 2000);
}
$effect(() => {
	return () => { 
		if (interval) clearInterval(interval) 
	}
});
onMount(() => {
  handleStart();
})
</script>

<main class="container" 
  style="background-color: {colors[currentColorIndex]}">
  {@render children?.()}
</main>

<style>
.container {
  display: flex;
  border-radius: 5px;
  padding: 2rem;
  transition: background-color 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>