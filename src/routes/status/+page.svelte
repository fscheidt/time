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

{#snippet json(item)}
  <div class="flex flex-col gap-1 m-2">
    <h2>{item?.title}</h2>
    <pre>{JSON.stringify(item.data, null, 2)}</pre>
  </div>
{/snippet}

<div class="status p-2">
  {@render json({ title:"device", data: device })}
  {@render json({ title:"app", data: status.app })}  
</div>
