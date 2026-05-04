<script>
import { cn } from "$lib/utils.js";
import { format } from "date-fns";
import Badge from "$lib/components/ui/badge/badge.svelte";
let {
  fmt = "HH:mm:ss.SSS",
  date = $bindable(),  
  mask = "__:__:__",
  label,
  class: className
} = $props();
let dt = $derived( date != null ? 
  format(date, fmt) 
  : mask
);
</script>

<div class={cn("text-teal-500", className)}>
  {#if label}
    <Badge variant="ghost">{label}</Badge>
  {/if}
  <div class={cn("time", className)}>{dt}</div>
</div>

<style>
.time {
  font-family: var(--font-mono);
  font-weight: 600;  
}
</style>