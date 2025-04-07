import client from "./client";

/**
 *
 * @param {{email:string, userName:string, password:string, bio:string?, phone:string?}} param0
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function register({ email, userName, password, bio, phone }) {
  try {
    const resp = await client.post("/auth/register", {
      email,
      user_name: userName,
      password,
      bio,
      phone,
    });
    return { status: resp.status, message: resp.statusText };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{email:string, otp:string}} param0
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function verifyOtp({ email, otp }) {
  try {
    const resp = await client.post("/auth/otp/verify", {
      email,
      otp,
    });
    return { status: resp.status, message: resp.statusText };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{email:string}} param0
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function resendOtp({ email }) {
  try {
    const resp = await client.post("/auth/otp/resend", {
      email,
    });
    return { status: resp.status, message: resp.statusText };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{email:string, password:string}} param0
 * @returns {Promise<{status:number, message:string, token:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function login({ email, password }) {
  try {
    const resp = await client.post("/auth/login", {
      email,
      password,
    });
    return {
      status: resp.status,
      message: resp.statusText,
      token: resp.data?.auth_token,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function logout() {
  try {
    const resp = await client.post("/auth/logout");
    return {
      status: resp.status,
      message: resp.statusText,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @returns {Promise<{status:number, message:string, data:any}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function getMe() {
  try {
    const resp = await client.get("/users/me");
    return {
      status: resp.status,
      message: resp.statusText,
      data: resp.data,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{userName:string, bio:string, phone:string}} param0
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function updateMe({ userName, bio, phone }) {
  try {
    const resp = await client.patch("/users/me", {
      user_name: userName,
      bio,
      phone,
    });
    return {
      status: resp.status,
      message: resp.statusText,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{avatar:File}} param0
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function uploadAvatar({ avatar }) {
  try {
    if (!avatar) return { status: 400, message: "file missing" };

    const fileData = await avatar.arrayBuffer();
    const resp = await client.put("/users/avatar", fileData, {
      headers: {
        "Content-Type": avatar.type,
        "Content-Length": fileData.byteLength,
      },
    });
    return {
      status: resp.status,
      message: resp.statusText,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function deleteAvatar() {
  try {
    const resp = await client.delete("/users/avatar");
    return {
      status: resp.status,
      message: resp.statusText,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{searchQuery: string, page: number, limit: number, sortBy: "newest" | "oldest" | "mostPopular", filterBy: "all" | "story" | "drawing"}} param0
 * @returns {Promise<{status:number, message:string, data:any[]}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function getPosts({ searchQuery, page, limit, sortBy, filterBy }) {
  try {
    const resp = await client.get("/posts", {
      params: {
        search_query: searchQuery,
        page,
        limit,
        sort_by: sortBy,
        filter_by: filterBy,
      },
    });
    return {
      status: resp.status,
      message: resp.statusText,
      data: resp.data,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @returns {Promise<{status:number, message:string, data:any[]}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function getLatestPosts() {
  try {
    const resp = await client.get("/posts/latest");
    return {
      status: resp.status,
      message: resp.statusText,
      data: resp.data,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @returns {Promise<{status:number, message:string, data:any[]}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function getPopularPosts() {
  try {
    const resp = await client.get("/posts/popular");
    return {
      status: resp.status,
      message: resp.statusText,
      data: resp.data,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{id:string}} param0
 * @returns {Promise<{status:number, message:string, data:any}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function getPostById({ id }) {
  try {
    const resp = await client.get(`/posts/${id}`);
    return {
      status: resp.status,
      message: resp.statusText,
      data: resp.data,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{title:string, description:string?, content:string, kind: "story" | "drawing", category:string}} param0
 * @returns {Promise<{status:number, message:string, id:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function createStory({
  title,
  description,
  content,
  kind,
  category,
}) {
  try {
    const resp = await client.post("/posts/story", {
      title,
      description,
      content,
      kind,
      category,
    });
    return {
      status: resp.status,
      message: resp.statusText,
      id: resp.data?.id,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}

/**
 *
 * @param {{thumbnail:File, postId:string}} param0
 * @returns {Promise<{status:number, message:string}>}
 * @throws {{error:boolean, message:string, status:number}}
 */
export async function uploadThumbnail({ thumbnail, postId }) {
  try {
    if (!thumbnail) return { status: 400, message: "file missing" };

    const fileData = await thumbnail.arrayBuffer();
    const resp = await client.put(`/posts/${postId}/thumbnail`, fileData, {
      headers: {
        "Content-Type": thumbnail.type,
        "Content-Length": fileData.byteLength,
      },
    });
    return {
      status: resp.status,
      message: resp.statusText,
    };
  } catch (error) {
    throw {
      error: true,
      message: error?.response?.data?.error || "something went wrong",
      status: error?.status || 500,
    };
  }
}
