<script>
import { format } from "date-fns";
import Countdown from "$lib/timer/Countdown.svelte";
let currentTime = $state();
let isRunning = $state(false);
let pageTitle = $derived(isRunning ? 
  format(currentTime,"HH:mm:ss")
  : "Timer paused" )
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="flex flex-col gap-4">
  <Countdown
    bind:currentTime
    bind:isRunning
  />
</div>