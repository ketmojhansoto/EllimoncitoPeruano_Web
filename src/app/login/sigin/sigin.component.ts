import { Component, OnInit } from '@angular/core';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { UseridService } from 'src/app/services/userid/userid.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {


  private user: SocialUser;
  private loggedIn: boolean;
  userid: any[] = [];
  useridT:any[] = [];

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private userIdService: UseridService) { }

  userForm = new FormGroup({
    nombreuser: new FormControl(''),
    contrasenia: new FormControl(''),
  });

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      if (this.user !== null) {
        this.router.navigate(['../account'])        
      }
      else {
        console.log('Usuario no registrado')
      }
    });

    this.listarUserId();
    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
 
  signOut(): void {
    this.authService.signOut();
  }

  guardarUserSocial(user){
    this.userIdService.addUserId(user);
    console.log('Guardo User Social');
    this.listarUserId();
  }

  guardarUserId(userId){
    this.userIdService.addUserId(userId);
    console.log('Guardo User');
    this.listarUserId();

  }
  
  listarUserId(){
    this.userIdService.getUserId().subscribe(data => {
      this.useridT = data;
      console.log('UsuarioId');
      console.log(this.useridT);
    },
      error => alert(error),
      );
  }


  crearUser(){
    this.userService.create(this.userForm.value).subscribe(
      (ok) =>{(this.guardarUserId(ok));this.router.navigate(['../account'])},
      (err) => console.log(err) 
    )
  }


}
