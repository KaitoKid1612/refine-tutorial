const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: {
  getList: ({ resource, pagination, filters, sorters, meta }: {
    resource: string;
    pagination: any;
    filters: any;
    sorters: any;
    meta: any
  }) => Promise<{ total: any; data: any }>;
  getOne: ({ resource, id, meta }: { resource: string; id: any; meta: any }) => Promise<{ data: any }>;
  update: ({ resource, id, variables, meta }: { resource: string; id: any; variables: any; meta: any }) => Promise<{
    data: any
  }>
} = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables, meta}) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
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

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data, total: data.length };
  }
};