# OpenArena BSP file parser

This package converts an OpenArena BSP files and OpenArena Shader files into a JavaScript structure.

## Usage

This example uses TypeScript.

```typescript
import { BspFile, parseBspFile, parseShaders, Shader } from 'openarena-bsp-parser';

const bspBuffer: Buffer; // Buffer with BSP file content
const map: BspFile = parseBspFile(buffer);

const shaderText: string; // shader file content
const shaders: Shader[] = parseShaders(shaderText);
```

## TODO

- Add prettier (or other formatter) to the project
- Add some tests
- Support all lumps and shader properties
