<script>
import './layout.css';
import './timer.css';
import { ModeWatcher } from "mode-watcher";
let { children } = $props();
import NavMenu from '$lib/timer/NavMenu.svelte';
</script>

<svelte:head>
	<title>Timer</title>
</svelte:head>

<main>
	<ModeWatcher />
	<NavMenu/>
	{@render children()}
</main>
