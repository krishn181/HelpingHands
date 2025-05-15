package com.HelpingHands.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForgotController {

    @RequestMapping("/forget")
    public String openEmail(){
        return"Forget_mail_form";
    }
}
