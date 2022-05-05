export type pt = {
    x:number,
    y:number,
    z?:number
}

export type F = {
    v:pt,
    n:pt,
    uv?:pt
}

export type Tri = {
    p1:pt,
    p2:pt,
    p3:pt
}

export type Quad = {
    p1:pt,
    p2:pt,
    p3:pt,
    p4:pt
}