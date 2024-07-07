<script lang="ts">
	let clazz = '';
	export { clazz as class };
</script>

<div class={clazz + ' ' + 'flex w-full bg-black text-white'}>
	<!-- Buildings -->
	<div class="w-1/2">
		<div class="grid grid-cols-5">
			<button class="flex p-1 bg-green-600"><img src="collector.png" alt="Collector" class="my-auto w-4 h-4">Collector</button>
		</div>
		<div class="grid grid-cols-5">
			<button class="p-1 bg-red-600">Blaster</button>
		</div>
	</div>
	<div class="flex justify-end w-full">
		<div class="flex">
			<p class="-rotate-90 translate-x-12">Upgrades</p>
			<button class="px-4 text-4xl bg-green-700">0</button>
		</div>
		<div class="grid grid-cols-2">
			<p class="my-auto h-2 w-8 -rotate-90 -indent-4">Elevation</p>
			<div class="grid p-1 space-y-1 h-full bg-black">
				<div class="bg-white"></div>
				<div class="bg-white"></div>
				<div class="bg-white"></div>
				<div class="bg-white"></div>
				<div class="bg-white"></div>
				<div class="bg-white"></div>
			</div>
		</div>
		<div>
			<div class="flex flex-col text-center px-2 bg-blue-600 border">
				<p>Mission time</p>
				<p class="text-rose-300">0:00</p>
			</div>
		</div>
		<div class="grid grid-cols-2">
			<div>Energy</div>
			<div></div>
			<div>Collection</div>
			<div></div>
			<div>Depletion</div>
			<div></div>
			<div>Deficit</div>
			<div></div>
		</div>
		<div class="grid">
			<div><p>Pause</p></div>
			<div><p>Sound</p></div>
			<div><p>Music</p></div>
		</div>
		<div class="grid">
			<button class="px-2 bg-yellow-600">Options</button>
			<button class="px-2 bg-green-600">Help</button>
			<button class="px-2 bg-red-800">Exit Game</button>
		</div>
	</div>
</div>
