<script>
	import { FillLayer, MapLibre, GeoJSON, Popup, Marker } from 'svelte-maplibre';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<MapLibre
  center={[-90.318682, 38.627987]}
  zoom={9.8}
  class="map"
  standardControls
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
>
  {#each data.zones as zone}
    <GeoJSON data={zone.boundary}>
			<FillLayer
			  paint={{
					'fill-color': zone.color,
					'fill-opacity': 0.5
				}}
			>
				<Popup offset={[0, -16]}>
					{zone.id}
				</Popup>
			</FillLayer>
		</GeoJSON>
		<Marker class="outlineText" lngLat={zone.centroid.coordinates}>{zone.id}</Marker>
  {/each}
</MapLibre>

<pre>{JSON.stringify(data, null, 2)}</pre>

<style>
  :global(.map) {
    height: 500px;
  }

	:global(.outlineText) {
		font-size: 16px;
		font-weight: bold;
		color: #222222;
		text-shadow:
			-1px -1px 0 #EEEEEE,
			1px -1px 0 #EEEEEE,
			-1px 1px 0 #EEEEEE,
			1px 1px 0 #EEEEEE;
	}
</style>