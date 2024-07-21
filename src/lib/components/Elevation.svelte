<script lang="ts">
    export let posHeight: number;
</script>

<div class="grid p-1 space-y-1 h-full bg-black">
    <div class={"bg-white " + (posHeight > 5 ? "floor": "")}></div>
    <div class={"bg-white " + (posHeight > 4 ? "floor": "")}></div>
    <div class={"bg-white " + (posHeight > 3 ? "floor": "")}></div>
    <div class={"bg-white " + (posHeight > 2 ? "floor": "")}></div>
    <div class={"bg-white " + (posHeight > 1 ? "floor": "")}></div>
    <div class={"bg-white " + (posHeight > 0 ? "floor": "")}></div>
</div>

<style lang="postcss">
    .floor {
        background-color: theme(colors.green.800);
    }
</style>