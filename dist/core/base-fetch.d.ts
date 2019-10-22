declare const _default: "\n/**\n * search 参数转换，比如 { a: 1, b: 2, c: undefined } 转换成 \"a=1&b=2\"\n * 会自动删除 undefined\n */\nfunction locationStringify(\n    obj: {\n        [key: string]: any\n    } = {}\n): string {\n    return Object.entries(obj).reduce((str, [key, value]) => {\n        if (value === undefined) {\n            return str\n        }\n        str = str ? str + '&' : str\n        return str + key + '=' + value\n    }, '')\n}\n\n/** 请求类型 */\ntype REQUEST_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'HEAD'\n\ninterface IRequestParams {\n    endpoint: string\n    method?: REQUEST_METHOD\n    params?: any\n}\n\nexport default async <Res extends { [x: string]: any }>(params: IRequestParams): Promise<Res> => {\n    let requestUrl = params.endpoint\n    const requestParams: any = {\n        credentials: 'include',\n        method: params.method || 'GET',\n        headers: { 'Content-Type': 'application/json' },\n    }\n\n    if (requestParams.method === 'GET') {\n        requestUrl = requestUrl + '?' + locationStringify(params.params)\n    } else if (params.params) {\n        requestParams.body = JSON.stringify(params.params)\n    }\n    const res = await fetch(requestUrl, requestParams)\n    const retJSON = res.clone() // clone before return\n    return retJSON.json()\n}\n";
export default _default;
