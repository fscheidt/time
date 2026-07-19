<script>
import { format } from "date-fns";
import Countdown from "$lib/timer/Countdown.svelte";
import { configs } from "$lib/index.js";
    import Transition from "$lib/timer/Transition.svelte";
let autostart = $state(configs.autostart);
let minutes = $state(configs.minutes);
let currentTime = $state(new Date());
let isRunning = $state(false);
let pageTitle = $derived(isRunning 
  ? format(currentTime,"HH:mm:ss")
  : "Timer" 
  )
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="flex flex-col w-fit">

  <Countdown
    bind:autostart
    bind:minutes
    bind:currentTime
    bind:isRunning
  />
</div>
