const f = async (
  api: string,
  body?: object | null,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST"
): Promise<ResultAPI> => {
  try {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    console.log(BASRURL + api);

    let response = await fetch(BASRURL + api, {
      method: method,
      headers,
      body: method === "GET" ? null : JSON.stringify(body),
    });
    if (!response) {
      return {
        data: null,
        err: "response not exsits",
      };
    }

    let json = await response.json();
    if (json && json.err) {
      console.log(json.err);
    }
    return json;
  } catch (error) {
    return {
      data: null,
      err: error,
    };
  }
};