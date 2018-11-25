// this comment must be ignored
textures/suction/light_solid_white
{
	qer_editorimage textures/suction/solid_white.jpg
	surfaceparm nomarks
	surfaceparm nolightmap
	{
		map textures/suction/solid_white.jpg
		blendFunc GL_ONE GL_ZERO
	}
}

/**
 * also multi line comments must be ignored
 */
textures/suction/beam_red
{
	qer_trans 0.5
	surfaceparm nonsolid
	surfaceparm nolightmap
	surfaceparm trans
	cull disable	
	{
		map textures/suction/beam_red.tga
		blendfunc GL_SRC_ALPHA GL_ONE_MINUS_SRC_ALPHA
	}
	{
		map textures/suction/beam_mover.jpg
		blendfunc add
		tcGen base
		tcMod scroll 0 -0.2
	}
}

textures/suction/greenfloor
{
	qer_editorimage textures/suction/solid_green.jpg
	qer_trans 0.5
	surfaceparm nolightmap
	surfaceparm trans
	q3map_nonplanar
	q3map_shadeangle 160
	cull disable
	{
		map textures/suction/solid_green.jpg
		alphaGen const 0.45
		blendfunc GL_SRC_ALPHA GL_ONE_MINUS_SRC_ALPHA
	}
	{
		map textures/suction/envmap.jpg
		blendfunc add
		tcGen environment
		tcMod scale 0.3 0.3
	}
}

textures/suction/sky
{
	q3map_lightimage textures/suction/plasma1
	qer_editorimage textures/suction/plasma1
	surfaceparm noimpact
	surfaceparm nolightmap
	surfaceparm sky

	q3map_sunExt 0.929 0.874 0.435 100 45 60 4 16
	q3map_globaltexture

	skyparms env/plasky/plasky 1024 -
	{
		map textures/suction/plasma1.tga
		tcMod scale 0.08 0.08
		tcMod scroll 0.001 0.001
		blendfunc filter
	}
	{
		map textures/suction/plasma2.tga
		tcMod scale 0.09 0.09
		tcMod scroll -0.002 -0.002
		blendfunc filter
	}
}
