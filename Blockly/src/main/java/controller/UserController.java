package controller;

import bean.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.UserService;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/signin",method = RequestMethod.POST)
    public String signin(@RequestParam(value = "userName",required = false) String name,
                         @RequestParam(value = "password",required = false) String pwd){
        System.out.println("name="+name+"   pwd="+pwd);
        if(name == null || pwd == null || "".equals(name) || "".equals(pwd)){
            return "fail";
        }
        if(userService.selectUserByName(name)!=null){
            return "fail";
        }
        UserEntity user = new UserEntity();
        user.setName(name);
        user.setPwd(pwd);
        if(userService.insertUser(user)!=0){
            return "success";
        }

        return "fail";
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(@RequestParam(value = "userName",required = false) String name,
                         @RequestParam(value = "password",required = false) String pwd,
                        HttpSession session){
        System.out.println("name="+name+"   pwd="+pwd);
        if(name == null && pwd == null){
            return "fail";
        }
        if(userService.selectUserByName(name)==null){
            return "fail";
        }
        System.out.println(session.getAttribute("user"));
        UserEntity user = userService.selectUserByName(name);
        if(user.getPwd().equals(pwd)){
            session.setAttribute("user",user);  //用session保存了登录的用户
            return "success";
        }
        return "fail";
    }

    @RequestMapping("/logout")
    public String logout(HttpSession session){
        if(session.getAttribute("user")!=null){
            session.removeAttribute("user");
            return "success";
        }
        return "fail";
    }
}
