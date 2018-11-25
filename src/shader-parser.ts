import { Tokenizer } from './utils/tokenizer';

const MAX_SHADER_STAGES = 8;

export function parseShaderFile(shaderText: string): Shader[] {
    const tokenizer = new Tokenizer(shaderText);
    let token: string | undefined;
    const shaders: Shader[] = [];
    while (token = tokenizer.nextToken(true)) {
        shaders.push(parseShader(tokenizer, token.toLowerCase()));
    }

    return shaders;
}

export interface Shader {
    name: string;
    stages: ShaderStage[];
    cullType: 'front' | 'back' | 'both';
    noMipMaps: boolean;
    noPicMip: boolean;
    polygonOffset: boolean;
    /** entityMergable, allowing sprite surfaces from multiple entities to be merged into one batch.
      This is a savings for smoke puffs and blood, but can't be used for anything where the shader calcs 
      (not the surface function) reference the entity color or scroll */
    entityMergable: boolean;
};

export interface ShaderStage {
    map?: string;
}

function parseShader(tokenizer: Tokenizer, name: string): Shader {
    const shader: Shader = {
        name,
        noMipMaps: false,
        noPicMip: false,
        entityMergable: false,
        polygonOffset: false,
        cullType: 'front',
        stages: []
    };

    try {
        let token: string | undefined;
        if ((token = tokenizer.nextToken(true)) !== '{') {
            throw new Error(`Open bracket after shader name expected (was '${token}', line ${tokenizer.getLine()})`);
        }

        while (true) {
            token = tokenizer.nextToken(true);
            if (!token) {
                throw new Error('Unexpected end of shader definition');
            }

            // skip stuff that only the QuakeEdRadient or q3map needs
            if (token.startsWith('qer') || token.startsWith('q3map')) {
                tokenizer.skipLine();
                continue;
            }

            switch (token.toLowerCase()) {
                case '}':
                    return shader;
                case '{':
                    if (shader.stages.length === MAX_SHADER_STAGES) {
                        throw new Error(`Maximum shader stages reached! (line ${tokenizer.getLine()})`);
                    }
                    const stage = parseShaderStage(tokenizer);
                    if (stage.map) {
                        shader.stages.push(stage);
                    }
                    break;
                case 'nomipmaps':
                    shader.noMipMaps = true;
                    shader.noPicMip = true;
                    break;
                case 'nopicmip':
                    shader.noPicMip = true;
                    break;
                case 'polygonoffset':
                    shader.polygonOffset = true;
                    break;
                case 'entitymergable':
                    shader.entityMergable = true;
                    break;
                case 'cull':
                    token = tokenizer.nextToken(false);
                    if (token === 'none' || token === 'twosided' || token === 'disable') {
                        shader.cullType = 'both';
                    } else if (token === 'front' || token === 'frontside' || token === 'frontsided') {
                        shader.cullType = 'front';
                    } else if (token === 'back' || token === 'backside' || token === 'backsided') {
                        shader.cullType = 'back';
                    } else {
                        console.warn(`Invalid cull parm '${token}' in shader '${name}' (line ${tokenizer.getLine()})`);
                    }
                    break;
                case 'tesssize':
                case 'deformvertexes':
                case 'surfaceparm':
                case 'fogparms':
                case 'skyparms':
                case 'sort':
                case 'portal':
                case 'light':
                    tokenizer.skipLine();
                    break;
                default:
                    console.warn(`Unsupported shader parameter '${token}' in shader '${name}' (line ${tokenizer.getLine()})`);
                    tokenizer.skipLine();
            }
        }
    } catch (e) {
        e.message = `Error parsing shader '${name}: ${e.message} (line ${tokenizer.getLine()})`;
        throw e;
    }
}

function parseShaderStage(tokenizer: Tokenizer): ShaderStage {
    const stage: ShaderStage = {};
    while (true) {
        let token = tokenizer.nextToken(true);
        if (!token) {
            throw new Error(`no matching '}' found`);
        }
        switch (token.toLowerCase()) {
            case '}':
                return stage;
            case 'map':
                token = tokenizer.nextToken(false);
                if (!token) {
                    throw new Error(`no value for parameter 'map' (line ${tokenizer.getLine()})`)
                }
                if (token !== '$whiteimage' && token !== '$lightmap') {
                    stage.map = token;
                }
                break;
            case 'blendfunc':
            case 'rgbgen':
            case 'tcgen':
            case 'alphagen':
            case 'animmap':
            case 'clampmap':
            case 'videomap':
            case 'tcmod':
            case 'detail':
            case 'alphafunc':
            case 'depthfunc':
            case 'depthwrite':
            case 'sort':
                tokenizer.skipLine();
                break;
            default:
                console.warn(`Unknown stage parameter '${token}' (line ${tokenizer.getLine()})`);
                tokenizer.skipLine();
        }
    }
}