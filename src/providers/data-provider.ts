const API_URL = "https://api.fake-rest.refine.dev";

const fetcher = async (url: string, options?: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: localStorage.getItem("my_access_token"),
    },
  });
}

export const dataProvider: {
  getList: ({ resource, pagination, filters, sorters, meta }: {
    resource: any;
    pagination: any;
    filters: any;
    sorters: any;
    meta: any
  }) => Promise<{ total: any; data: any }>;
  getMany: ({ resource, ids, meta }: { resource: any; ids: any; meta: any }) => Promise<{ data: any }>;
  getOne: ({ resource, id, meta }: { resource: any; id: any; meta: any }) => Promise<{ data: any }>;
  update: ({ resource, id, variables, meta }: { resource: any; id: any; variables: any; meta: any }) => Promise<{
    data: any
  }>;
  create: ({ resource, variables }: { resource: any; variables: any }) => Promise<{ data: any }>
} = {
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetcher(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables, meta}) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    return { data };
  },
  getList: async ({ resource, pagination, filters, sorters, meta}) => {
    const params: Record<URLSearchParams, string>  = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        params.append(filter.field, filter.value);
      });
    }

    const response = await fetcher(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const total = Number(response.headers.get("x-total-count"));

    const data = await response.json();

    return { data, total };
  },
  create: async ({ resource, variables }) => {
    const response = await fetcher(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
};