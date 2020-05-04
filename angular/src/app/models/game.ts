export interface IGame {
    id: number;
    name: string;
    description: string;
    hint: string;
    toobox: string;
    xmlData: string;//存储游戏进度
    type:string;//游戏类型
    level:string;//游戏难度
    url:string;//地址
    run(code : string):boolean; //判断是否通过
}
