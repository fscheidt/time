<script>
import './layout.css';
import './timer.css';
import favicon from '$lib/assets/favicon.svg';
import { ModeWatcher } from "mode-watcher";
import SunIcon from "@lucide/svelte/icons/sun";
import MoonIcon from "@lucide/svelte/icons/moon";
import { toggleMode } from "mode-watcher";
import Button from '$lib/components/ui/button/button.svelte';
let { children } = $props();
</script>

<svelte:head>
	<title>Timer</title>
</svelte:head>

<ModeWatcher />

<nav class="flex gap-2 p-4">
	<Button onclick={toggleMode} variant="outline" size="icon">
		<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"/>
		<MoonIcon	class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"/>
	</Button>
	<Button variant="link">
		<a href="/">timer</a>
	</Button>
	<Button variant="link">
		<a href="/now">now</a>
	</Button>
</nav>

{@render children()}
