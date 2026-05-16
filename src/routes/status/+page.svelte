<script>
import { App } from '$lib/index';
let status = App.status();
let device = $state(status.device);
</script>
<svelte:window 
  bind:innerWidth={device.width}
  bind:innerHeight={device.height}
></svelte:window>

<svelte:head>
  <title>Status</title>
</svelte:head>

<div class="status p-2">
  <div class="flex flex-col gap-1 m-2">
    <h2>device</h2>
    <pre>{JSON.stringify(device, null, 2)}</pre>
  </div>
  <div class="flex flex-col gap-1 m-2">
    <h2>app</h2>
    <pre>{JSON.stringify(status.app, null, 2)}</pre>
  </div>
</div>
