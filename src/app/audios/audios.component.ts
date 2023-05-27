import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css'],
})
export class AudiosComponent {
  songFile: any;
  imageFile: any;
  userName: any;
  files: any = [];
  addForm!: FormGroup<any>;
  updateForm!: FormGroup<any>;
  registerForm!: FormGroup<any>;
  showUpdateButton: boolean = true;
  showaddButton: boolean = false;
  updateUserName: any;
  updateid: any;
  edituserName: any;
  editId: any;
  imagePath: any;
  saveImage: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userName = sessionStorage.getItem('userName');
  }

  title = 'Song.mp3';
  dataValue: any = '0';
  ngOnInit() {
    this.getSongs();
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
    this.updateForm = this.formBuilder.group({
      editname: ['', [Validators.required]],
      editdesc: ['', [Validators.required]],
    });
    if (sessionStorage.getItem('dataValue') != null) {
      this.dataValue = sessionStorage.getItem('dataValue');
    }

    let userName = sessionStorage.getItem('userName');
  }
  ////File
  selectFile(event: any) {
    const file = event.target.files[0];
    this.songFile = file;
  }
  ///////Image
  selectImage(event: any) {
    const image = event.target.files[0];
    if (image.type == 'image/jpeg') {
      this.imageFile = image;
      this.addimage();
    } else {
      this.imagePath = sessionStorage.setItem('imagePath', 'No Path');
    }
  }
  addimage() {
    alert('add image');
    const formData = new FormData();
    formData.append('file', this.imageFile);
    this.http
      .post('http://localhost:8443/api/image', formData)
      .subscribe((res: any) => {
        console.log(res, 'jojoj');
        this.saveImage = res.path;
        this.imagePath = sessionStorage.setItem('imagePath', res.path);
      });
  }
  addsong() {
    const formData = new FormData();
    formData.append('file', this.songFile);
    if (this.addForm.valid) {
      let params = new HttpParams();
      params = params.set('name', this.addForm.value.name);
      params = params.set('description', this.addForm.value.desc);
      params = params.set('image', this.saveImage);
      params = params.set('userName', this.userName);
      this.http
        .post('http://localhost:8443/api/addAudio?' + params, formData)
        .subscribe((res: any) => {
          let path = res.song;
          this.getSongs();
        });
    } else {
    }
  }

  //////////////////////////////////////////////////////////////////////////
  audio = new Audio();

  fileplay(file: any) {
    alert('hhh');
    let url = file.songFile;
    alert(url);
    console.log(file, 'oop');

    this.audio.src = 'http://localhost:8443/' + url;
    this.audio.load();
    this.audio.play();
  }
  /////PLAY
  play() {
    alert('lll');
    this.audio.play();
  }

  /////PAUSE
  pause() {
    this.audio.pause();
  }

  getSongs() {
    this.http
      .get('http://localhost:8443/api/getaudioList' + '/' + this.userName)
      .subscribe((res: any) => {
        this.files = res;
        console.log(res, 'jhjhj');
      });
  }

  deleteSong(data: any) {
    this.http
      .delete('http://localhost:8443/api/deleteAudio' + '/' + data.id)
      .subscribe((res: any) => {
        this.getSongs();
      });
  }
  editSong(data: any) {
    this.editId = sessionStorage.setItem('editId', data.id);
    this.edituserName = sessionStorage.setItem('edituserName', data.userName);
    this.files.filter((d: any) => {
      this.showUpdateButton = false;
      this.showaddButton = true;
      if (data.id == d.id) {
        this.updateForm.patchValue({
          editname: data.name,
          editdesc: data.description,
        });
      }
    });
  }

  updateSong() {
    alert(this.updateForm.value.editname);
    const formData = new FormData();
    formData.append('file', this.songFile);
    this.updateid = sessionStorage.getItem('editId');
    this.updateUserName = sessionStorage.getItem('edituserName');
    if (this.updateForm.valid) {
      let params = new HttpParams();
      params = params.set('name', this.updateForm.value.editname);
      params = params.set('desc', this.updateForm.value.editdesc);
      params = params.set('image', this.saveImage);
      params = params.set('id', this.updateid);
      params = params.set('userName', this.updateUserName);

      this.http
        .patch('http://localhost:8443/api/updateAudio?' + params, formData)
        .subscribe((res: any) => {
          this.getSongs();
        });
    }
  }
}
