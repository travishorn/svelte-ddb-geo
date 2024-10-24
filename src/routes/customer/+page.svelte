<script>
  import { MapLibre, DefaultMarker, Popup } from 'svelte-maplibre';

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
  {#each data.customers as customer}
    <DefaultMarker lngLat={customer.location.coordinates}>
      <Popup offset={[0, -16]}>
        {customer.id}
      </Popup>
    </DefaultMarker>
  {/each}
</MapLibre>

<pre>{JSON.stringify(data, null, 2)}</pre>

<style>
  :global(.map) {
    height: 500px;
  }
</style>