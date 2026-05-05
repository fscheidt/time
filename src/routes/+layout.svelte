<script>
import './layout.css';
import './timer.css';
import { base } from '$app/paths';
import { ModeWatcher } from "mode-watcher";
import SunIcon from "@lucide/svelte/icons/sun";
import MoonIcon from "@lucide/svelte/icons/moon";
import { toggleMode } from "mode-watcher";
import Button from '$lib/components/ui/button/button.svelte';
let { children } = $props();
import { cn } from '$lib/utils';
</script>

<svelte:head>
	<title>Timer</title>
</svelte:head>

<ModeWatcher />

<nav class="flex gap-2 p-4 items-center">
	<Button onclick={toggleMode} variant="outline" size="icon">
		<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"/>
		<MoonIcon	class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"/>
	</Button>
	
	<a href={`${base}/`}
		class={cn("hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none")}
		>timer</a>
	<a href={`${base}/now`}
		class={cn("hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none")}
		>now</a>

</nav>

{@render children()}
