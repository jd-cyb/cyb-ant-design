import { isUrl } from '@/utils/utils';

const menuData = [
  {
    name: '首页',
    icon: 'dashboard',
    path: 'dashboard'
  },
  {
    name: '表单',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      }
    ],
  },
  {
    name: '表格',
    icon: 'table',
    path: 'table',
    children: [
      {
        name: '基本表格',
        path: 'basic-table',
      },
      {
        name: '高级表格',
        path: 'search-table',
      },
      // {
      //   name: '搜索列表',
      //   path: 'search',
      //   children: [
      //     {
      //       name: '搜索列表（文章）',
      //       path: 'articles',
      //     },
      //     {
      //       name: '搜索列表（项目）',
      //       path: 'projects',
      //     },
      //     {
      //       name: '搜索列表（应用）',
      //       path: 'applications',
      //     },
      //   ],
      // },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      }
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
