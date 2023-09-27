package jp.wasabeef.sample;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import jp.wasabeef.richeditor.RichEditor;

public class MainActivity extends AppCompatActivity {

  private RichEditor mEditor;
  private TextView mPreview;

  private static final String TAG = "MainActivity";

  private static final String CONTENT_FILE = "rich_editor.html";

  private static final int IMG_PICK_REQUEST_CODE = 3;

  @SuppressLint("NewApi")
  private void saveContent(String content) {
    try {
      File dir = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
      if (dir != null) {
        dir.mkdirs();
        File file = new File(dir, CONTENT_FILE);
        Files.write(file.toPath(), content.getBytes());
      } else {
        Log.i(TAG, "save contents failed");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @SuppressLint("NewApi")
  private void loadContent() {
    try {
      File dir = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
      if (dir != null) {
        dir.mkdirs();
        File file = new File(dir, CONTENT_FILE);
        if (!file.exists()) {
          return;
        }
        byte[] buffer = Files.readAllBytes(file.toPath());
        if (mEditor != null) {
          String content = new String(buffer);
          mEditor.setHtml(content);
        }
      } else {
        Log.i(TAG, "save contents failed");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @SuppressLint("NewApi")
  @Override
  protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (resultCode == RESULT_OK) {
      switch (requestCode) {
        case IMG_PICK_REQUEST_CODE:
          InputStream is;
          if (mEditor == null) {
            return;
          }
          Uri uri = data.getData();
          if (uri == null) {
            Log.i(TAG, "failed uri");
            return;
          }
          try {
              Log.i(TAG, "image_uri: " + data.getData());
              is = getContentResolver().openInputStream(uri);
              if (is == null) {
                Log.e(TAG, "is is null");
                return;
              }

              File dir = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
              dir.mkdirs();
              File imgFile = new File(dir, uri.getLastPathSegment() + ".jpg");
              Files.copy(is, imgFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
              String absolutePath = "file://" + imgFile.getAbsolutePath();
              Log.i(TAG, "save_image_path: " + absolutePath);
              mEditor.insertImage(absolutePath, "pic-desc", "margin-top:10px;max-width:20%;");
              is.close();
          } catch (Exception e) {
            e.printStackTrace();
          }
          break;
        default:
          break;
      }
    }
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mEditor = (RichEditor) findViewById(R.id.editor);
    mEditor.setEditorHeight(200);
    mEditor.setEditorFontSize(22);
    mEditor.setEditorFontColor(Color.RED);
    //mEditor.setEditorBackgroundColor(Color.BLUE);
    //mEditor.setBackgroundColor(Color.BLUE);
    //mEditor.setBackgroundResource(R.drawable.bg);
    mEditor.setPadding(10, 10, 10, 10);
    //mEditor.setBackground("https://raw.githubusercontent.com/wasabeef/art/master/chip.jpg");
    mEditor.setPlaceholder("Insert text here...");
    //mEditor.setInputEnabled(false);

    mPreview = (TextView) findViewById(R.id.preview);
    loadContent();
    mEditor.setOnTextChangeListener(new RichEditor.OnTextChangeListener() {
      @Override
      public void onTextChange(String text) {
        mPreview.setText(text);
      }
    });

    findViewById(R.id.action_undo).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.undo();
      }
    });

    findViewById(R.id.action_redo).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.redo();
      }
    });

    findViewById(R.id.action_bold).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setBold();
      }
    });

    findViewById(R.id.action_italic).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setItalic();
      }
    });

    findViewById(R.id.action_subscript).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setSubscript();
      }
    });

    findViewById(R.id.action_superscript).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setSuperscript();
      }
    });

    findViewById(R.id.action_strikethrough).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setStrikeThrough();
      }
    });

    findViewById(R.id.action_underline).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setUnderline();
      }
    });

    findViewById(R.id.action_heading1).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setHeading(1);
      }
    });

    findViewById(R.id.action_heading2).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setHeading(2);
      }
    });

    findViewById(R.id.action_heading3).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setHeading(3);
      }
    });

    findViewById(R.id.action_heading4).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setHeading(4);
      }
    });

    findViewById(R.id.action_heading5).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setHeading(5);
      }
    });

    findViewById(R.id.action_heading6).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setHeading(6);
      }
    });

    findViewById(R.id.action_txt_color).setOnClickListener(new View.OnClickListener() {
      private boolean isChanged;

      @Override
      public void onClick(View v) {
        mEditor.setTextColor(isChanged ? Color.BLACK : Color.RED);
        isChanged = !isChanged;
      }
    });

    findViewById(R.id.action_bg_color).setOnClickListener(new View.OnClickListener() {
      private boolean isChanged;

      @Override
      public void onClick(View v) {
        mEditor.setTextBackgroundColor(isChanged ? Color.TRANSPARENT : Color.YELLOW);
        isChanged = !isChanged;
      }
    });

    findViewById(R.id.action_indent).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setIndent();
      }
    });

    findViewById(R.id.action_outdent).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setOutdent();
      }
    });

    findViewById(R.id.action_align_left).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setAlignLeft();
      }
    });

    findViewById(R.id.action_align_center).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setAlignCenter();
      }
    });

    findViewById(R.id.action_align_right).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setAlignRight();
      }
    });

    findViewById(R.id.action_blockquote).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setBlockquote();
      }
    });

    findViewById(R.id.action_insert_bullets).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setBullets();
      }
    });

    findViewById(R.id.action_insert_numbers).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.setNumbers();
      }
    });

    findViewById(R.id.action_insert_image).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.insertImage("https://raw.githubusercontent.com/wasabeef/art/master/chip.jpg",
          "dachshund", 320);
      }
    });

    findViewById(R.id.action_insert_local_image).setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View v) {
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/jpg");
        startActivityForResult(intent, IMG_PICK_REQUEST_CODE);
      }
    });

    findViewById(R.id.action_insert_youtube).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.insertYoutubeVideo("https://www.youtube.com/embed/pS5peqApgUA");
      }
    });

    findViewById(R.id.action_insert_audio).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.insertAudio("https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3");
      }
    });

    findViewById(R.id.action_insert_video).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.insertVideo("https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_10MB.mp4", 360);
      }
    });

    findViewById(R.id.action_insert_link).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.insertLink("https://github.com/wasabeef", "wasabeef");
      }
    });
    findViewById(R.id.action_insert_checkbox).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        mEditor.insertTodo();
      }
    });
    findViewById(R.id.save).setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        Log.i(TAG, "save html");
        if (mEditor != null) {
          String content = mEditor.getHtml();
          saveContent(content);
          finish();
        }
      }
    });
  }
}
