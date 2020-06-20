import { Component, OnInit } from '@angular/core';
import { ViagemService } from '../services/viagem/viagem.service'
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-procurar-carona',
  templateUrl: './procurar-carona.page.html',
  styleUrls: ['./procurar-carona.page.scss'],
})
export class ProcurarCaronaPage implements OnInit {

  viagens;

  constructor(private viagemService: ViagemService,
    private alertController: AlertController,
    private navCtrl: NavController) {
    this.viagens = [];
  }

  ngOnInit() {
    this.buscarViagens();

  }

  async exibirMensagemCadastroRealizado() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Cadastro realizado com sucesso',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateRoot('home');
          },
        },
      ],
    });

    await alert.present();
  }


  solicitarCarona(viagem: any) {
    console.log(viagem)
    this.viagemService.solicitarCarona(viagem.id).subscribe(() => {
      //sucesso
      // this.buscarViagens();
    }, (error: Error) => {

    });
  }


  buscarViagens() {
    this.viagemService.buscarViagens().subscribe(
      data => {
        console.log(data);
        this.viagens = data;
        console.log(this.viagens);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}