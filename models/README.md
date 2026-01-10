# 3D Model Instructions

## How to Add Your 3D Model

1. **Export your 3D model** in GLB or GLTF format (recommended: GLB for smaller file size)
   - GLB is preferred as it's a single binary file
   - GLTF works but requires additional files

2. **Name your file**: `vocl-device.glb` (or `.gltf`)

3. **Place it in this folder**: `/models/vocl-device.glb`

4. **Optimize your model** (recommended):
   - Keep file size under 5MB for fast loading
   - Use compression tools if needed
   - Reduce polygon count if the model is too complex

## Supported Formats

- ✅ GLB (recommended)
- ✅ GLTF
- ✅ USDZ (for AR on iOS)

## Model Viewer Features

The model viewer includes:
- **Auto-rotate**: Model rotates automatically
- **Camera controls**: Users can drag to rotate, scroll to zoom
- **AR support**: Works with WebXR and Quick Look (iOS)
- **Shadow**: Realistic lighting and shadows

## Customization

To customize the model viewer, edit the `model-viewer` tag in `technology.html`:

```html
<model-viewer 
    src="models/vocl-device.glb" 
    alt="VOCL 3D Device Model"
    camera-controls 
    auto-rotate 
    rotation-per-second="30deg"  <!-- Change rotation speed -->
    shadow-intensity="1"          <!-- Adjust shadows (0-1) -->
    exposure="1"                  <!-- Adjust brightness (0-2) -->
    ...
```

## Testing

1. Open `technology.html` in your browser
2. The model should load automatically
3. If you see "Loading 3D model...", check:
   - File path is correct
   - File format is GLB/GLTF
   - File is not corrupted

## Alternative: Using Sketchfab

If you prefer to host your model on Sketchfab:

1. Upload your model to Sketchfab
2. Get the embed code
3. Replace the `model-viewer` section in `technology.html` with the Sketchfab iframe
